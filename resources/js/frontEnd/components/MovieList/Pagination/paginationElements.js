/* 
 * Pagination UI Design using HTML CSS & JavaScript | Fully Functional Pagination Design in JavaScript
 * https://www.youtube.com/watch?v=d2ve7xQNco8&
 */
import styled from 'styled-components';

/* #20b2aa */
export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: ${({theme}) => theme.size.size200};
`;

export const UL = styled.ul`
    display: flex;
    background: ${({theme}) => theme.color.clrNeutral900};
    padding: ${({theme}) => theme.size.size200};
    border-radius: ${({theme}) => theme.size.size500};;
`;

export const LI = styled.li`
    color:  ${({theme}) => theme.color.clrNeutral100};
    list-style: none;
    line-height:  ${({theme}) => theme.lineHeight.lbPaginationElements};

    font-size: ${({theme}) => theme.fontSize.fsBody};
    font-weight: ${({theme}) => theme.fontWeight.fwSemiBold};;

    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    /* Ensimmäiset tai viimeisen valinta */ 
    &.btn {
        padding: 0 20px;
    }

    &.prev {
        border-radius: 25px 5px 5px 25px;
    }

    &.next {
        border-radius: 5px 25px 25px 5px;
    }

    &.numb {
        border-radius: 50%;

        height: 35px;
        width: 35px;

        margin: 0 3px; 
    }

    &.numb:hover,
    &.btn:hover {
        background: ${({theme})  => theme.color.clrAccent400};
    }

    &.active,
    &.active:hover {
        color: ${({theme})  => theme.color.clrAccent400};
        background: ${({theme})  => theme.color.clrAccent100};
        cursor: default;
    }


`;
