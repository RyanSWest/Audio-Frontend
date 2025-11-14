import { Dropdown } from 'react-bootstrap';

function ThemeSelector({ theme, setTheme }) {
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle variant="secondary" id="dropdown-theme">
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setTheme('purple')}>Purple</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('green')}>Green</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('cyan')}>Cyan</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('red')}>Red</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSelector;
