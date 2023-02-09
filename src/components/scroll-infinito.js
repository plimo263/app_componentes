import React, { useEffect, useState, useMemo, memo  } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PropTypes from 'prop-types'
import { Stack, CircularProgress } from '@mui/material';


const  ScrollInfinito = ({ itens, render, itensPorPagina, tamanho }) => {
  // Pagina inicial
  const [pagina, setPagina] = useState(1);
  
  // Verifica se o corpo esta sofrendo atualizacao
  useEffect(()=>{
    // Se o corpo esta sendo atualizado devolva a pagina para 1
    setPagina(1);
  }, [setPagina, itens]);
  //
  // Fatiamento dos registros 
  const fatiaRegistros = useMemo(()=> (pagina === null) ? itens : itens.slice(0, pagina * itensPorPagina), [itens, pagina, itensPorPagina] );

  // Se a quantidade de registros for menor que 101 nao
  //
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    //loading: aguardar,
    // Somente ativa o observer do scroll os itens for maior que itensPorPagina
    hasNextPage: (itens.length > itensPorPagina && pagina && itens.length > fatiaRegistros.length),
    onLoadMore: ()=> {
        setPagina(state=> state + 1);
    },
    delayInMs: 400, 
    //disabled: aguardar,       
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });
  

  return (
    <div style={{overflowY: 'auto', maxHeight: tamanho}} ref={rootRef}>
        {fatiaRegistros.map((ele,idx)=>(
            <span key={idx}>
                {render(ele, idx)}
            </span>
        ))}
         {/* Isto previne que o loading fique aparecendo mesmo em registros menores que 100 */}
         { pagina && itens.length > itensPorPagina &&  itens.length > fatiaRegistros.length && (
        <Stack ref={sentryRef} direction='row' justifyContent='center'>
            <CircularProgress size={20}  />             
        </Stack>                        
        )}

    </div>
  )
}
ScrollInfinito.defaultProps = {
    itensPorPagina: 30,
    tamanho: '58vh',
}

ScrollInfinito.propTypes = {
  /** Um array que vai determinar os itens. Passe um array com os dados que deseja renderizar e renderiza na props render */
  itens: PropTypes.array.isRequired,
  /** Uma funcao que deve retornar um componente que irá receber o valor de cada item do array itens */
  render: PropTypes.func.isRequired,
  /** O tamanho máximo que o scroll deve ser exibido, qualquer quantidade de itens que sobreponha este tamanho deve ficar oculto */
  tamanho: PropTypes.string,
  /** A quantidade de itens a serem exibidos por vez. Quando o scroll estiver proximo ao ultimo item ele irá carregar a quantidade de itens informada */
  itensPorPagina: PropTypes.number,
}

export default memo(ScrollInfinito);
