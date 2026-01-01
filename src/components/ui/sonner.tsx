"use client"

import {
  CircleCheck,
  Info,
  Loader2,
  XCircle,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg font-sans",
          description: "group-[.toast]:text-slate-500",
          actionButton: "group-[.toast]:bg-indigo-600 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500",
          
          error: "group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-100 group-[.toaster]:!text-red-600",
          success: "group-[.toaster]:!bg-green-50 group-[.toaster]:!border-green-100 group-[.toaster]:!text-green-600",
          warning: "group-[.toaster]:!bg-amber-50 group-[.toaster]:!border-amber-100 group-[.toaster]:!text-amber-600",
          info: "group-[.toaster]:!bg-blue-50 group-[.toaster]:!border-blue-100 group-[.toaster]:!text-blue-600",
        },
      }}
      icons={{
        success: <CircleCheck className="size-5 text-green-600" />,
        info: <Info className="size-5 text-blue-600" />,
        warning: <TriangleAlert className="size-5 text-amber-600" />,
        error: <XCircle className="size-5 text-red-600" />,
        loading: <Loader2 className="size-4 animate-spin text-slate-500" />,
      }}
      {...props}
    />
  )
}

export { Toaster }