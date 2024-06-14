import { Text, Container} from '@mantine/core';
import classes from './footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Mr.Richards.Developers. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}