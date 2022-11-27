import { Box, Pagination, Typography } from '@mui/material';
import Task from 'classes/Task';
import TaskList from 'components/entity/task/TaskList';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import { useEffect, useState } from 'react';
import { getPageTitle } from 'utils';
import Layout from '../../components/layout/Layout';
import { nameEntity } from 'hooks/utils';
import { GAME_DESC } from 'constants/contracts';

const CONF = {
  PAGE_TITLE: nameEntity('task', true),
  TITLE: nameEntity('task', true),
  SUBTITLE: GAME_DESC.task,
};

/** TODO: DEPRECATE & Use indexNew (SoulList)
 *
 *
 * Page for a list of Tasks
 * @todo: Add pagination. Maybe use the SQL list component...
 */
// eslint-disable-next-line prettier/prettier
export default function TasksPage({}: any) {
  const { handleError } = useError();
  const { getTasks } = useTask();
  const [tasks, setTasks] = useState<Array<Task> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const pageSize = 16;

  async function loadData(page = currentPage, pageCount = currentPageCount) {
    try {
      // Update states
      setCurrentPage(page);
      setCurrentPageCount(pageCount);
      // Update states
      setTasks(null);
      // Load tasks
      const items = await getTasks(
        undefined,
        undefined,
        undefined,
        pageSize,
        (page - 1) * pageSize,
      );
      setTasks(items);
      // Add next page to pagination if possible
      if (page == pageCount && items.length === pageSize) {
        setCurrentPageCount(pageCount + 1);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1, 1);
  }, []);

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h1">{CONF.PAGE_TITLE}</Typography>
          <Typography variant="subtitle1">{CONF.SUBTITLE}</Typography>
        </Box>
      </Box>

      <TaskList tasks={tasks} sx={{ mt: 1 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between' },
          alignItems: { md: 'center' },
          mt: 3,
        }}
      >
        <Pagination
          color="primary"
          sx={{ mt: { xs: 2, md: 0 } }}
          count={currentPageCount}
          page={currentPage}
          onChange={(_, page) => loadData(page)}
        />
      </Box>
    </Layout>
  );
}
