import { WHATSAPP_PHONE } from "@/lib/constants";

export function buildWhatsAppProductMessage(
  productName: string,
  price: number,
  productUrl: string,
): string {
  const message = `Hello, I am in Europe and interested in '${productName}' (listed at ₹${price}). Please share more details and shipping to my country.\nProduct URL: ${productUrl}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppGeneralMessage(): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hello, I am in Europe and would like to know more about your eco-friendly products and delivery options.",
  )}`;
}

type CartWhatsAppItem = {
  name: string;
  quantity: number;
  price: number;
};

export function buildWhatsAppCartMessage(
  items: CartWhatsAppItem[],
  subtotal: number,
  note?: string,
): string {
  const itemLines = items
    .map((item, index) => {
      const lineTotal = item.price * item.quantity;
      return `${index + 1}. ${item.name} x ${item.quantity} = ₹${lineTotal}`;
    })
    .join("\n");

  const message = [
    "Hello, I want to place an order for delivery in Europe / the UK. Items:",
    "",
    itemLines,
    "",
    `Subtotal: ₹${subtotal}`,
    note ? `Note: ${note}` : "",
    "Please share final shipping and payment details for Europe delivery.",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
