import { markContactReadAction } from "@/lib/actions/admin";

export function MarkReadButton({ id }: { id: string }) {
  return (
    <form action={markContactReadAction.bind(null, id)}>
      <button type="submit" className="text-xs text-forest hover:underline">
        Marquer comme lu
      </button>
    </form>
  );
}
