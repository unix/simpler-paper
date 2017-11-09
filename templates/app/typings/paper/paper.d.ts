type PaperRouter = {
  default?: string,
}

type Paper = {
  router: PaperRouter,
}

interface Window {
  __paper?: Paper
}
