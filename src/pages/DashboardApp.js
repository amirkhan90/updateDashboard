// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';
import WrappedMap from 'src/components/Maps';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Box color="dark" style={{ height: '1024px', width: '100%' }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBpI4lcmxMKdnkrrRlZUF-eQanA2ZSDZVI`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Box>
      </Container>
    </Page>
  );
}
