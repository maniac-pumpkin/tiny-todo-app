import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ComponentProps } from "react"

function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider
