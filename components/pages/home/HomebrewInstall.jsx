import styled from 'styled-components';

const HOMEBREW_COMMAND =
  'brew install --cask suhang12332/swiftcraftlauncher/swift-craft-launcher';

const Install = styled.div`
  max-width: 100%;
`;

const Command = styled.code`
  display: block;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 10px;
  background: var(--fill-tertiary);
  color: var(--label-secondary-color);
  font-family: 'SF Mono', 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1.33337;
  letter-spacing: -0.01em;
  text-align: left;
  overflow-wrap: anywhere;
  user-select: all;
`;

const HomebrewInstall = () => (
  <Install>
    <Command>{HOMEBREW_COMMAND}</Command>
  </Install>
);

export default HomebrewInstall;
