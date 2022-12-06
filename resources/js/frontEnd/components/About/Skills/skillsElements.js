import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;

    div.grid-item {
        
        /* background-color: rgba(255, 255, 255, 0.8); */
        /* border: 1px solid rgba(0, 0, 0, 0.8); */
        /* padding: 20px; */
        /* font-size: 30px; */
        /* text-align: center; */
      
        display: flex;
        justify-content: center;
        align-items: center;
      
        padding: 5px;
    }
`;