import service from "@/helper/axios";
import { QRCodeResponse, QRInteractionPayload } from "@/types/auth.types";

// 📱 QR + Signup Flow
export function getQRCode(hash: string, slug: string): Promise<QRCodeResponse> {
  return service
    .get(`/qr/${hash}/${slug}`)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to fetch QR code data";
      throw new Error(errorMessage);
    });
}

export function submitQRInteraction(payload: QRInteractionPayload): Promise<void> {
  return service
    .post("/qr/interacties", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to submit QR interaction";
      throw new Error(errorMessage);
    });
} 