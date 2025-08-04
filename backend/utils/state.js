import { Annotation } from "@langchain/langgraph";

export const InputStateAnnotation = Annotation.Root({
  question: Annotation,
});

export const StateAnnotation = Annotation.Root({
  question: Annotation,
  query: Annotation,
  result: Annotation,
  answer: Annotation,
});
