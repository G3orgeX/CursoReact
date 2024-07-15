import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe("preubas en el hook de nuestro useFetchGifs", () => {
  test("should debe de regresar el estasdo inicial", () => {
    const { result } = renderHook(() => useFetchGifs("one punch"));
    const { images, isLoading } = result.current;
    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
    // useFetchGifs();
  });
  test("debe de retornar un arreglo de imagene y el isLoading en false", async () => {
    const { result } = renderHook(() => useFetchGifs("one punch"));
    await waitFor(() =>
        expect(result.current.images.length).toBeGreaterThan(0)
);
const { images, isLoading } = result.current;
    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
    // useFetchGifs();
  });
});
