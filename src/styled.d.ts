import 'styled-components';

declare module 'styled-components' {
  export interface StyledCell {
    readonly isActive: boolean;
  }
}
