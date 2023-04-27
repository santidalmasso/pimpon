import * as React from 'react'

import {cn} from '~/lib/utils'
import * as ComboboxPrimitive from '@headlessui/react'

const Combobox = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Combobox>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Combobox>
>(({className, ...props}, ref) => (
  <ComboboxPrimitive.Combobox ref={ref} className={cn(className)} {...props} />
))
Combobox.displayName = 'Combobox'

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Combobox.Input>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Combobox.Input>
>(({className, ...props}, ref) => (
  <ComboboxPrimitive.Combobox.Input
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
      className,
    )}
    {...props}
  />
))
ComboboxInput.displayName = 'ComboboxInput'

const Options = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Combobox.Options>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Combobox.Options>
>(({className, ...props}, ref) => (
  <ComboboxPrimitive.Combobox.Options
    ref={ref}
    className={cn(
      'absolute w-44 p-1 overflow-hidden rounded-md bg-white border text-slate-800 shadow-md animate-in',
      className,
    )}
    {...props}
  />
))
Options.displayName = 'Options'

const Option = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Combobox.Option>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Combobox.Option>
>(({className, ...props}, ref) => (
  <ComboboxPrimitive.Combobox.Option
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 text-slate-800 data-[headlessui-state="active"]:bg-slate-100 data-[headlessui-state="selected"]:bg-slate-100',
      className,
    )}
    {...props}
  />
))
Option.displayName = 'Option'

export {Combobox, Option, Options, ComboboxInput}
