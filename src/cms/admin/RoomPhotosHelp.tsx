import type { UIFieldServerProps } from "payload";
import { rooms } from "@/content/rooms";
import { RoomPhotosPanel } from "./RoomPhotosPanel";

/**
 * Top of the Photos tab. A server component only so that it can read the photographs the room has on the website today
 * (the built-in ones, until staff add their own) and hand them to the client panel. Display and upload helper; stores nothing itself.
 */
export function RoomPhotosHelp(props: UIFieldServerProps) {
  const data = (props.data ?? props.siblingData ?? {}) as { slug?: string };
  const room = rooms.find((r) => r.slug === data.slug);
  return <RoomPhotosPanel live={(room?.images ?? []).map((i) => ({ src: i.src, alt: i.alt.en }))} />;
}
