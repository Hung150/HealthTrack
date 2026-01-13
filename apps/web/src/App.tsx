import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e90ff',
    },
    secondary: {
      main: '#ff6b6b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            🏥 HealthTrack Web
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
            Your Personal Health Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 2 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="primary">
                📊 Health Metrics
              </Typography>
              <Typography variant="body1" paragraph>
                • Track daily water intake
              </Typography>
              <Typography variant="body1" paragraph>
                • Monitor calories burned
              </Typography>
              <Typography variant="body1" paragraph>
                • Log sleep hours
              </Typography>
              <Typography variant="body1" paragraph>
                • Record exercise minutes
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="primary">
                📈 Analytics & Insights
              </Typography>
              <Typography variant="body1" paragraph>
                • Visual progress charts
              </Typography>
              <Typography variant="body1" paragraph>
                • Weekly/monthly reports
              </Typography>
              <Typography variant="body1" paragraph>
                • Goal tracking
              </Typography>
              <Typography variant="body1" paragraph>
                • Health recommendations
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Cross-platform health tracking application
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Built with: React, TypeScript, Redux, Material-UI
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
