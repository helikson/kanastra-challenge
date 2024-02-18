import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModeToggle } from '@/components'
import { ThemeProvider } from '@/components/theme-provider'

const ToggleTheme = () => (
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
   </ThemeProvider>
)

describe('ModeToggle', () => {
   beforeEach(async () => {
      render(<ToggleTheme />)
      const button = screen.getByRole('button', { name: /Toggle theme/i })
      await userEvent.click(button)
   })

   it('should trigger the dropdown menu when the button is clicked', () => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
   })

   it('should set the theme to "light" when "Light" is clicked', async () => {
      await userEvent.click(screen.getByText('Light'));
      expect(document.documentElement.classList.contains("light")).toBe(true);
   })

   it('should set the theme to "dark" when "Dark" is clicked', async () => {
      await userEvent.click(screen.getByText('Dark'));
      expect(document.documentElement.classList.contains("dark")).toBe(true);
   })

   it('should set the theme to "system" when "System" is clicked', async () => {
      await userEvent.click(screen.getByText('System'));
      // Using mock to window.matchMedia to return false
      expect(window.matchMedia("(prefers-color-scheme: dark)").matches).toBe(false);
   })
})