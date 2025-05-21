import type { Meta, StoryObj } from "@storybook/react";

import { Anchor } from ".";

const meta: Meta<typeof Anchor> = {
  title: "Atoms/Anchor",
  component: Anchor,
  tags: ["autodocs"],
  argTypes: {
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "링크 타겟",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## 접근성 고려사항
- 의미 있는 링크 텍스트 사용 ('여기를 클릭하세요' 대신 콘텐츠 설명)
- 외부 링크에는 자동으로 \`rel="noopener noreferrer"\` 추가
- 포커스 스타일 유지
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 앵커
export const Default: Story = {
  args: {
    href: "https://example.com",
    children: "기본 링크",
  },
};

// 외부 링크 예제
export const ExternalLink: Story = {
  args: {
    ...Default.args,
    children: "외부 링크",
    target: "_blank",
  },
  parameters: {
    docs: {
      description: {
        story: '외부 링크는 자동으로 `rel="noopener noreferrer"`가 추가됩니다.',
      },
    },
  },
};

// 접근성 개선 예제
export const AccessibleAnchor: Story = {
  args: {
    ...Default.args,
    children: "PDF 다운로드",
    href: "/example.pdf",
    screenReaderText: "사용자 매뉴얼 PDF 다운로드 (1.2MB)",
  },
};
