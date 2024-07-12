import { render, screen } from "@testing-library/react";
import { GifGridItem } from "../../src/components/GifGridItem";

describe("Test de GifgridItem", () => {
  const title = "Saitama";
  const url = "https://one-punch.com/saitama.jpg";
  test("Crear Snapshot", () => {
    const { container } = render(<GifGridItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });
  test("should mostrar la imagen con el url y el alt indicado", () => {
    render(<GifGridItem title={title} url={url} />);
    // expect(screen.getByRole('img').src).toBe(url);
    const {src, alt } = screen.getByRole('img');
    expect(src).toBe(url);
    expect(alt).toBe(alt);
  });
  test("should mostrar el titulo del componente", () => {
    render(<GifGridItem title={title} url={url} />);
    expect(screen.getByText(title)).toBeTruthy();
  });
  
});
