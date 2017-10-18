import React from 'react'
import { BaseFieldProps, GenericField, WrappedFieldProps, Formatter, Normalizer, Parser, Validator } from 'redux-form'

declare module 'redux-form' {

  interface EventOrValueHandler<Event> extends React.EventHandler<React.SyntheticEvent<any>> {
    (value: any): void
  }

  interface CommonFieldProps {
    name: string
    onBlur: EventOrValueHandler<FocusEvent>
    onChange: EventOrValueHandler<React.ChangeEvent<any>>
    onDragStart: React.EventHandler<React.DragEvent<any>>
    onDrop: React.EventHandler<React.DragEvent<any>>
    onFocus: React.EventHandler<React.FocusEvent<any>>
  }

  export class Field<P = any> extends React.Component<BaseFieldProps<P> & P> implements GenericField<P> {
    public dirty: boolean
    public name: string
    public pristine: boolean
    public value: any
    public getRenderedComponent(): React.Component<WrappedFieldProps & P>
  }

  export interface BaseFieldProps<P = {}> extends Partial<CommonFieldProps> {
    name: string
    component?: React.ComponentType<P> | 'input' | 'select' | 'textarea'
    format?: Formatter | null
    normalize?: Normalizer
    props?: P
    parse?: Parser
    validate?: Validator | Validator[]
    warn?: Validator | Validator[]
    withRef?: boolean
  }

}
