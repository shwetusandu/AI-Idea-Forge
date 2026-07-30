import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blueprint/$id")({
  component: Blueprint,
});

function Blueprint() {
  return <h1>Blueprint</h1>;
}