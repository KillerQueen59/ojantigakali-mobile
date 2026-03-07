import ArcadeGame from "@/components/ArcadeGame";
import { ThemeProvider } from "@/themes/ThemeContext";

export default function Page() {
  return (
    <ThemeProvider>
      <ArcadeGame />
    </ThemeProvider>
  );
}
