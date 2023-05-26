/******************************************************
 * Program ID : src/componetnts/atoms/CmCard.js
 * Program Name : 공통 카드 영역 컴포넌트
 * Create On : 2023.05.13
 * 개 요 : 공통 카드 영역 컴포넌트
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.13   김정아 차장   최초 작성
 ******************************************************/
// import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Card, CardContent, CardHeader, Link, List, ListItem, ListItemText, Typography } from '@mui/material';

import { ReactComponent as DeleteIcon } from '@/stylesheets/images/cmCardDelIcon.svg';
import { ReactComponent as EditIcon } from '@/stylesheets/images/cmCardEditIcon.svg';
// icon
import { ReactComponent as SubIcon } from '@/stylesheets/images/cmCardSubIcon.svg';

import { CARD_DATA } from '@/example/GenaralCode';

import { CmCardStyle } from './Atoms.Styled';
// Common Component
import { CmIconButton } from './CmButton';

type propsType = {
  onClick?: (e: string) => void;
};

function CmCard(props: propsType) {
  const { onClick } = props;

  const handleClick = (type: string) => {
    typeof onClick === 'function' && onClick(type);
  };

  return (
    <CmCardStyle>
      <Card>
        <CardHeader
          action={
            <>
              <CmIconButton
                btnTitle="Edit"
                iconName={<EditIcon />}
                onClick={() => handleClick('I')}
              />
              <CmIconButton
                btnTitle="Delete"
                iconName={<DeleteIcon onClick={() => handleClick('D')} />}
              />
            </>
          }
          title="Title"
        />
        <CardContent>
          <Typography className="conTitle">
            <SubIcon />
            Resource
          </Typography>

          <List className="conList">
            {CARD_DATA.map((CARD_DATA) => (
              <ListItem
                key={CARD_DATA.key}
                disableGutters
                secondaryAction={
                  CARD_DATA.key === 1 ? (
                    // <CmButton variant="text" className="underLink" btnTitle={CARD_DATA.num} />
                    <Link
                      href="#"
                      underline="always"
                    >
                      {CARD_DATA.num}
                    </Link>
                  ) : (
                    CARD_DATA.num
                  )
                }
              >
                <ListItemText primary={CARD_DATA.list} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </CmCardStyle>
  );
}

function CmCardAdd() {
  return (
    <CmCardStyle>
      <Card className="addCard">
        <Button>
          <AddCircleIcon />
          Create New Application
        </Button>
      </Card>
    </CmCardStyle>
  );
}
export { CmCard, CmCardAdd };
