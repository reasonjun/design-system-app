# Contributing Guidelines

## Commit Convention

모든 커밋 메시지는 다음 형식을 따라야 합니다:

```
<Type>: <Subject>

<Body>
```

### Type

커밋 유형은 다음 중 하나여야 합니다:

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링 (기능 변경 없음)
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 프로세스나 도구 변경, 환경 설정 등
- `perf`: 성능 개선
- `ci`: CI 설정 변경
- `build`: 빌드 시스템 또는 외부 종속성 변경

### Subject
- 명령형 현재 시제로 작성 (added → add)
- 첫 글자는 소문자로 시작
- 마침표 없이 작성

### Body
- 변경 사항에 대한 상세 설명
- 왜 변경했는지, 무엇이 바뀌었는지 설명
- 줄 바꿈으로 Subject와 구분

### 예시

```
feat: add TextField component

인풋 필드와 라벨, 에러 메시지를 포함한 텍스트 필드 컴포넌트 구현
```

```
fix: resolve focus loss in ButtonGroup component

여러 버튼을 그룹화했을 때 두 번째 버튼 이후 포커스가 사라지는 문제 해결
```

```
refactor: improve ChoiceField component performance

불필요한 렌더링 최소화를 위한 메모이제이션 적용
```
