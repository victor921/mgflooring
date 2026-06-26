// Structure only — quote + detail live in i18n/locales/*.json under
// `testimonials.<id>`. Name + rating are language-neutral.
export interface Testimonial {
  id: string
  name: string
  rating: number
}

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Daniela R.', rating: 5 },
  { id: 't2', name: 'Marcus T.', rating: 5 },
  { id: 't3', name: 'Priya & Sam', rating: 5 },
  { id: 't4', name: 'Eleanor V.', rating: 5 },
  { id: 't5', name: 'Jon P.', rating: 5 },
  { id: 't6', name: 'Carla M.', rating: 5 },
]
