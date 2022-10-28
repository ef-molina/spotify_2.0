import { Flex } from './styles/Containers.style';
import { CardContainer, TitleText, MutedText } from './styles/Cards.style';
import { Link } from 'react-router-dom';

const imgSty = {
  boxShadow: '1px 1px 4px 2px rgba(0, 0, 0, 0.2)',
  // maxWidth: '139px',
  maxWidth: '100%',
};

export const ThinCard = ({ album }) => {
  const { artists, images, name } = album;

  if (album)
    return (
      <CardContainer gap='.8rem'>
        <img style={imgSty} src={images[2].url} />
        <Flex direction='column' gap='.5rem' justifyContent='space-evenly'>
          <TitleText>{name}</TitleText>
          <MutedText>{artists[0].name}</MutedText>
        </Flex>
      </CardContainer>
    );
};

export const TrackCard = ({ track }) => {
  const {
    album: { images },
    artists,
    name,
    id,
  } = track;

  const handleClick = (e) => {
    console.log(e.target);
    document.querySelector('.currentTrackImage').src = images[2]?.url;
    document.querySelector('.currentTrackTitle').innerText = name;
    document.querySelector('.currentTrackArtist').innerText = artists[0]?.name;
  };

  if (track)
    return (
      <CardContainer onClick={handleClick} direction='column' width='15%'>
        <img src={images[0]?.url} style={imgSty} />
        <Flex direction='column' gap='.5rem' padding='.5rem 0'>
          <TitleText>{name}</TitleText>
          <MutedText>{artists[0]?.name}</MutedText>
        </Flex>
      </CardContainer>
    );
};

export const AlbumCard = ({ album }) => {
  const { artists, name, images, id } = album;

  if (album)
    return (
      <CardContainer direction='column' width='15%'>
        <Link to={`/albums/${id}`}>
          <img src={images[0]?.url} style={imgSty} />
          <Flex direction='column' gap='.5rem' padding='.5rem 0'>
            <TitleText>{name}</TitleText>
            <MutedText>{artists[0]?.name}</MutedText>
          </Flex>
        </Link>
      </CardContainer>
    );
};

export const ArtistCard = ({ artist }) => {
  const { name, images, id } = artist;

  if (artist)
    return (
      <CardContainer direction='column' width='15%'>
        <Link to={`/artists/${id}`}>
          <img src={images[0]?.url} style={imgSty} />
          <Flex direction='column' gap='.5rem' padding='.5rem 0'>
            <TitleText>{name}</TitleText>
          </Flex>
        </Link>
      </CardContainer>
    );
};

export const PlaylistCard = ({ playlist }) => {
  const { name, images } = playlist;

  if (playlist)
    return (
      <CardContainer direction='column'>
        <img src={images[0]?.url} style={imgSty} />
        <Flex direction='column' gap='.5rem' padding='.5rem 0'>
          <TitleText>{name}</TitleText>
        </Flex>
      </CardContainer>
    );
};
