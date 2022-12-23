import { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import Layout from 'components/layout/Layout';
import PaginatedList from 'components/PaginatedList';
import SoulsByTypeRoleQuery from 'queries/SoulsByTypeRoleQuery';
import { gameCardContent } from 'utils/cardContents';
import { nameEntity } from 'hooks/utils';
import { GAME_DESC } from 'constants/contracts';

const CONF = {
  PAGE_TITLE: nameEntity('project', true),
  TITLE: nameEntity('project', true),
  SUBTITLE: GAME_DESC.project,
};

/**
 * Page for a list of projects
 */
export default function ProjectsPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const renderActions = (
    <Box>
      <Button
        disabled={!accountSoul}
        onClick={() =>
          showDialog?.(<ProjectManageDialog onClose={closeDialog} />)
        }
        variant="outlined"
      >
        Create Project
      </Button>
    </Box>
  );

  const listProps = {
    variables: {
      type: 'GAME',
      role: 'PROJECT',
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
