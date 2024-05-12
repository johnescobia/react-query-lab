const tintColorLight = '#007aff'; // A vibrant blue, commonly used for links and buttons
const tintColorDark = '#0a84ff'; // A slightly different shade of blue for dark mode to stand out against darker backgrounds

export default {
  light: {
    text: '#1a1a1a', // Slightly off-black for less harsh contrast
    background: '#ffffff', // Pure white
    tint: tintColorLight,
    tabIconDefault: '#bcbcbc', // Gray that's easy on the eyes
    tabIconSelected: tintColorLight,
    cardBackground: '#f0f0f0', // Light gray for card backgrounds or secondary elements
    border: '#e1e1e1', // Very light gray for borders and separators
  },
  dark: {
    text: '#e5e5e5', // Off-white for text to reduce brightness
    background: '#121212', // Very dark gray, better for OLED screens
    tint: tintColorDark,
    tabIconDefault: '#3a3a3a', // Dark gray for unselected icons
    tabIconSelected: tintColorDark,
    cardBackground: '#1e1e1e', // Slightly lighter than the background for depth
    border: '#2c2c2c', // Dark gray for borders and separators
  },
};
