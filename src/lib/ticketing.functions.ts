import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type PurchaseSeat = {
  sectorId: string;
  sectorName: string;
  seatLabel: string;
  priceRwf: number;
  holderName: string;
  holderEmail: string;
};

export type PurchaseInput = {
  matchId: string;
  matchLabel: string;
  matchDate: string;
  venue: string;
  paymentMethod: string;
  seats: PurchaseSeat[];
};

const reference = () =>
  `RSFC-${Math.random().toString(36).slice(2, 7).toUpperCase()}${Date.now()
    .toString(36)
    .slice(-4)
    .toUpperCase()}`;

/** Seats already sold for a match, so the seat matrix can grey them out. */
export const getTakenSeats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { matchId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("tickets")
      .select("sector_id, seat_label")
      .eq("match_id", data.matchId);
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => `${r.sector_id}:${r.seat_label}`);
  });

export const purchaseTickets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: PurchaseInput) => {
    if (!data.seats?.length) throw new Error("No seats selected");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const total = data.seats.reduce((sum, s) => sum + s.priceRwf, 0);

    const { data: order, error: orderError } = await supabase
      .from("ticket_orders")
      .insert({
        user_id: userId,
        match_id: data.matchId,
        match_label: data.matchLabel,
        match_date: data.matchDate,
        venue: data.venue,
        total_rwf: total,
        payment_method: data.paymentMethod,
      })
      .select("id")
      .single();
    if (orderError || !order) throw new Error(orderError?.message ?? "Order failed");

    const { error: ticketError } = await supabase.from("tickets").insert(
      data.seats.map((seat) => ({
        order_id: order.id,
        user_id: userId,
        match_id: data.matchId,
        match_label: data.matchLabel,
        match_date: data.matchDate,
        venue: data.venue,
        sector_id: seat.sectorId,
        sector_name: seat.sectorName,
        seat_label: seat.seatLabel,
        price_rwf: seat.priceRwf,
        holder_name: seat.holderName,
        holder_email: seat.holderEmail,
        reference: reference(),
      })),
    );
    if (ticketError) throw new Error(ticketError.message);

    return { orderId: order.id, totalRwf: total, seatCount: data.seats.length };
  });

export const getMyTickets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [tickets, rewards] = await Promise.all([
      context.supabase
        .from("tickets")
        .select("*")
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false }),
      context.supabase
        .from("rewards")
        .select("*")
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false }),
    ]);
    if (tickets.error) throw new Error(tickets.error.message);
    if (rewards.error) throw new Error(rewards.error.message);
    return { tickets: tickets.data ?? [], rewards: rewards.data ?? [] };
  });

/** Spin is only allowed once per completed order. */
export const claimSpinPrize = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { orderId: string; prize: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: order, error } = await supabase
      .from("ticket_orders")
      .select("id, spin_used")
      .eq("id", data.orderId)
      .eq("user_id", userId)
      .single();
    if (error || !order) throw new Error("Order not found");
    if (order.spin_used) throw new Error("This purchase has already been spun");

    const code = `DRINK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const { error: rewardError } = await supabase.from("rewards").insert({
      user_id: userId,
      order_id: data.orderId,
      prize: data.prize,
      code,
    });
    if (rewardError) throw new Error(rewardError.message);

    await supabase
      .from("ticket_orders")
      .update({ spin_used: true })
      .eq("id", data.orderId)
      .eq("user_id", userId);

    return { prize: data.prize, code };
  });
