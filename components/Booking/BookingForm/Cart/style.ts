import { styled } from 'twin.macro';

export const StyledBaseCartNavigation = styled.div`
  position: fixed;
  bottom: 0;

  max-width: 768px;
  width: 100%;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: end;
  .harga-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 124px;
    padding: 1.25rem 1.5rem;
    border: 1px solid #cdcccc;

    .total-harga {
      min-width: 0;
      p,
      h3 {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .total-harga {
    margin-right: 0.5rem;

    p {
      font-size: 1rem;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  .button-wrapper {
    button {
      padding: 0.5rem 1.5rem;
      height: unset;
    }
  }
`;
