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
import makeStyles from '@mui/styles/makeStyles';

// icon
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/cmCardDelIcon.svg';
import { ReactComponent as EditIcon } from '@/stylesheets/images/cmCardEditIcon.svg';
import { ReactComponent as SubIcon } from '@/stylesheets/images/cmCardSubIcon.svg';

import { CARD_DATA } from '@/example/GenaralCode';

// Common Component
import { CmIconButton } from './CmButton';

// Styled
const useStyles = makeStyles(({ palette, typography }) => ({
  card: {
    fontWeight: typography.fontWeightRegular,
    fontSize: '13px',
    lineHeight: '1.5',
    display: 'inline-block',
    padding: '20px',
    marginRight: '20px',
    maxWidth: '305px',
    minWidth: 'calc(100% / 5 - 16px )',
    minHeight: '270px',

    // cardTitle
    '& .MuiCardHeader-root': {
      padding: '0 5px 14px 5px',
      borderBottom: `1px solid ${palette.grey[100]}`,

      '& span.MuiCardHeader-title': {
        fontWeight: typography.fontWeightMedium,
        fontSize: '15px',
        lineHeight: '20px',
      },

      '& .MuiCardHeader-action': {
        paddingRight: '5px',
        margin: 0,
        opacity: 0,
        transition: 'opacity 250ms',

        '& label ~ label': {
          marginLeft: '5px',
        },
      },
    },
    // Hover - Btn
    '&:hover': {
      '& .MuiCardHeader-root .MuiCardHeader-action': {
        opacity: '1',
        '& path': {
          fill: palette.grey[300],
        },

        '& .MuiIconButton-root:hover path': {
          fill: palette.common.black,
        },
      },
    },

    // cardContent
    '& .MuiCardContent-root': {
      margin: '20px 35px 5px 35px',
      padding: 0,

      '& .conTitle': {
        display: 'flex',
        alignItems: 'center',
        fontWeight: typography.fontWeightMedium,
        fontSize: '15px',
        lineHeight: '1.5',
        marginBottom: '18px',

        '& svg': {
          marginRight: '10px',
          marginLeft: '-35px',
        },
      },

      '& .conList': {
        padding: 0,
        '& *': {
          padding: 0,
          fontWeight: typography.fontWeightRegular,
          fontSize: '13px',
          lineHeight: '24px',
        },
        '& .MuiListItemSecondaryAction-root': {
          width: '20%',

          '& a.MuiLink-root': {
            color: palette.info.main,
          },
        },
      },
    },
  },
  // addCard
  addCard: {
    fontWeight: typography.fontWeightRegular,
    fontSize: '13px',
    lineHeight: '1.5',
    display: 'inline-block',
    padding: '20px',
    maxWidth: '305px',
    minWidth: 'calc(100% / 5 - 16px )',
    minHeight: '270px',
    '& .MuiButtonBase-root': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '65px 0',
      margin: 'auto 0',
      fontWeight: typography.fontWeightRegular,
      fontSize: '16px',
      lineHeight: '1.5',
      color: palette.common.black,

      '& svg': {
        fontSize: '49px',
        marginBottom: '35px',
      },
      '&:hover': {
        background: 'none',
      },
    },
  },
}));
type propsType = {
  onClick?: (e: string) => void;
};

function CmCard(props: propsType) {
  const classes = useStyles();
  const { onClick } = props;

  const handleClick = (type: string) => {
    typeof onClick === 'function' && onClick(type);
  };

  return (
    // <CmCardStyle>
    <Card className={classes.card}>
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
  );
}

function CmCardAdd() {
  const classes = useStyles();
  return (
    <Card className={classes.addCard}>
      <Button>
        <AddCircleIcon />
        Create New Application
      </Button>
    </Card>
  );
}
export { CmCard, CmCardAdd };
