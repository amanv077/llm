import { Callout } from "@/components/ui/Callout";

export default function ComingSoonPage() {
  return (
    <Callout icon="🚧" className="bg-[#f8fafc] border-[#e2e8f0]">
      <div className="text-[#475569]">
        <strong>Content coming soon!</strong> The curriculum for this lesson is currently being written. Use the arrow keys (← →) or the button below to continue exploring the platform!
      </div>
    </Callout>
  );
}
