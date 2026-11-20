import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "centered",

    a11y: {
      // 'todo' - 접근성 위반을 테스트 UI에만 표시
      // 'error' - 접근성 위반 시 CI 실패
      // 'off' - 접근성 검사 생략
      test: "error",
    },
  },
};

export default preview;
