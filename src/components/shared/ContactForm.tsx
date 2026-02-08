import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome richiesto'),
  company: z.string().min(2, 'Azienda richiesta'),
  email: z.string().email('Email non valida'),
  message: z.string().min(10, 'Messaggio troppo corto'),
  tier: z.string().min(1, 'Seleziona un pacchetto'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
  inputClassName?: string
  buttonClassName?: string
}

export function ContactForm({ className, inputClassName, buttonClassName }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (_data: ContactFormData) => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <CheckCircle className="w-16 h-16 text-bigbro-purple" />
        <h3 className="text-2xl font-bold font-heading">Messaggio Inviato!</h3>
        <p className="text-bigbro-text-muted">Ti ricontatteremo al più presto.</p>
      </div>
    )
  }

  const baseInput = 'w-full bg-bigbro-card border border-white/10 rounded-lg px-4 py-3 text-bigbro-text placeholder:text-bigbro-text-muted/50 focus:outline-none focus:border-bigbro-purple transition-colors'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <input
            {...register('name')}
            placeholder="Il tuo nome"
            className={cn(baseInput, inputClassName)}
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('company')}
            placeholder="Azienda"
            className={cn(baseInput, inputClassName)}
          />
          {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
        </div>
      </div>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={cn(baseInput, inputClassName)}
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <select
          {...register('tier')}
          className={cn(baseInput, 'appearance-none cursor-pointer', inputClassName)}
        >
          <option value="">Seleziona pacchetto sponsor</option>
          <option value="naming-rights">Tier 1 - Naming Rights</option>
          <option value="team-partner">Tier 2 - Team Partner</option>
          <option value="digital-supporter">Tier 3 - Digital Supporter</option>
        </select>
        {errors.tier && <p className="text-red-400 text-sm mt-1">{errors.tier.message}</p>}
      </div>
      <div>
        <textarea
          {...register('message')}
          placeholder="Il tuo messaggio"
          rows={4}
          className={cn(baseInput, 'resize-none', inputClassName)}
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        className={cn(
          'w-full py-4 bg-bigbro-purple hover:bg-bigbro-purple-dark text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg',
          buttonClassName
        )}
      >
        <Send className="w-5 h-5" />
        Invia Messaggio
      </button>
    </form>
  )
}
