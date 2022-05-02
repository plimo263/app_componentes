import React, { useState,  memo  } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PropTypes from 'prop-types'
import { Stack, CircularProgress } from '@mui/material';


const  ScrollInfinitoController = ({ itens, render, onUpgradeItens, tamanho }) => {
  const [valores, setValores] = useState(itens);
  // Pagina inicial
  const [loading, setLoading ] = useState(true);  
  //
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    //loading: aguardar,
    // Somente permite a chamada a novos itens se loading ainda estiver ativo
    hasNextPage: loading,
    onLoadMore: async ()=> {
        const novosItens = await onUpgradeItens();
        if(novosItens.length < 1) {
          setLoading(false);
          return false;
        }
        // Incrementa com mais itens
        setValores(state=> state.concat(novosItens));
    },
    delayInMs: 400, 
    disabled: !loading,       
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });
  

  return (
    <div style={{overflowY: 'auto', maxHeight: tamanho}} ref={rootRef}>
        {valores.map((ele,idx)=>(
            <span key={idx}>
                {render(ele)}
            </span>
        ))}
         {/* Isto previne que o loading fique aparecendo mesmo em registros menores que 100 */}
         { loading && (
        <Stack ref={sentryRef} direction='row' justifyContent='center'>
            <CircularProgress size={20}  />             
        </Stack>                        
        )}
    </div>
  )
}
ScrollInfinitoController.defaultProps = {
    tamanho: '58vh',
}

ScrollInfinitoController.propTypes = {
  /** Um array que vai determinar os itens. Passe um array com os dados que deseja renderizar e renderiza na props render */
  itens: PropTypes.array.isRequired,
  /** Uma funcao que deve retornar um componente que irá receber o valor de cada item do array itens */
  render: PropTypes.func.isRequired,
  /** O tamanho máximo que o scroll deve ser exibido, qualquer quantidade de itens que sobreponha este tamanho deve ficar oculto */
  tamanho: PropTypes.string,
  /** Funcao de callback que atualiza a quantidade de itens (aciona mais itens) Seu retorno deve ser um array, caso vazio o loading é desativado */
  onUpgradeItens: PropTypes.func.isRequired,
}

export default memo(ScrollInfinitoController);
