import "../../i18n";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

export const testRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, options);
