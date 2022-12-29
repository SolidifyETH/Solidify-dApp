import { useContext } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import { gameCardContent } from 'utils/cardContents';
import { nameEntity } from 'helpers/utils';
import { GAME_DESC } from 'constants/contracts';
import PaginatedList from 'components/PaginatedList';
import SoulsByTypeRoleQuery from 'queries/SoulsByTypeRoleQuery';
import { noSoulMsg } from 'constants/texts';

const CONF = {
  PAGE_TITLE: nameEntity('mdao', true),
  TITLE: nameEntity('mdao', true),
  SUBTITLE: GAME_DESC.mdao,
};

/**
 * Game:mDAO List Page
 */
export default function DaosPage(): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  // const { handleError } = useError();

  const renderActions = (
    <Box>
      <Tooltip
        title={accountSoul ? 'Create a new ' + nameEntity('mdao') : noSoulMsg}
      >
        <Button
          disabled={!accountSoul}
          onClick={() =>
            showDialog?.(<DaoManageDialog onClose={closeDialog} />)
          }
          variant="outlined"
        >
          {'Create ' + nameEntity('mdao')}
        </Button>
      </Tooltip>
    </Box>
  );

  const listProps = {
    variables: {
      type: 'GAME',
      role: 'MDAO',
    },
    getCardContent: gameCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...listProps} query={SoulsByTypeRoleQuery} />
    </Layout>
  );
}
