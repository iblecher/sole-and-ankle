import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const STYLES = {
  "on-sale": {
    backgroundColor: COLORS.primary,
  },
  "new-release": {
    backgroundColor: COLORS.secondary,
  },
  "default": {
    backgroundColor: COLORS.primary,
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const style = STYLES[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <RowWrapper>
          <Row>
            <Name>{name}</Name>
            <Price>{formatPrice(price)}</Price>
          </Row>
          <Row>
            <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          </Row>
        </RowWrapper>
        {variant && variant !== "default" && <SalePrice style={{"--background-color": style.backgroundColor}}>{variant}</SalePrice>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  line-height: 1;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  background-color: var(--background-color);
  
  position: absolute;
  top: 16px;
  right: -8px;
  
  padding: 8px 10px;
`;

export default ShoeCard;
