import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discovery/$id")({
  component: Discovery,
});

function Discovery() {
  return <h1>Discovery</h1>;
}