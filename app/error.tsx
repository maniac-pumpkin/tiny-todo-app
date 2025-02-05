"use client"

import { Button } from "@/components/ui/button"
import { ServerCrash } from "lucide-react"

type PropsType = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: PropsType) {
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 space-y-5 text-center">
      <ServerCrash size={68} className="mx-auto" />
      <h3 className="text-xl font-bold">{error.name}</h3>
      <p className="max-w-96 text-lg">{error.message}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  )
}
