import { Container, PosterImg } from './posterElements';

const Poster = ({ src, title }) => {
    return (
        <Container>
            <PosterImg 
                title={title}
                src={src}
            />
        </Container>
    );
};

export default Poster;