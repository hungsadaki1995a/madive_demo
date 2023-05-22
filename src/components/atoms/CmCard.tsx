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
import { CmCardStyle } from './Atoms.Styled';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Button,
  Link,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';

// Common Component
import { /* CmButton, */ CmIconButton } from './CmButton';

// icon
import { ReactComponent as SubIcon } from '@/stylesheets/images/cmCardSubIcon.svg';
import { ReactComponent as EditIcon } from '@/stylesheets/images/cmCardEditIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/cmCardDelIcon.svg';
import AddCircleIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { CARD_DATA } from '@/example/GenaralCode';

function CmCard() {
  return (
    <CmCardStyle>
      <Card>
        <CardHeader
          action={
            <>
              <CmIconButton btnTitle="Edit" iconName={<EditIcon />} />
              <CmIconButton btnTitle="Delete" iconName={<DeleteIcon />} />
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
                    <Link href="#" underline="always">
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
