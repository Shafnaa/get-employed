CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER updated_at_application BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER updated_at_document BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER updated_at_todo BEFORE UPDATE ON todos FOR EACH ROW EXECUTE FUNCTION update_modified_column();