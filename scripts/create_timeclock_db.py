import os
import sys
import psycopg2
from dotenv import load_dotenv

load_dotenv(".env.local")
DB_URL = os.environ.get("DATABASE_URL") # Need direct postgres connection for DDL

if not DB_URL:
    print("Error: Missing DATABASE_URL in .env.local")
    sys.exit(1)

def migrate():
    print("Connecting to Supabase PostgreSQL...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = True
    cursor = conn.cursor()

    try:
        print("Creating 'employees' table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS employees (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
                is_active BOOLEAN NOT NULL DEFAULT TRUE
            );
        """)
        
        print("Creating 'time_entries' table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS time_entries (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
                clock_in TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                clock_out TIMESTAMP WITH TIME ZONE,
                notes TEXT
            );
        """)
        
        # Enable RLS (we will use service_role from the backend to bypass everywhere, 
        # but good practice to enable it so anon cant touch it from client-side)
        cursor.execute("ALTER TABLE employees ENABLE ROW LEVEL SECURITY;")
        cursor.execute("ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;")
        
        print("Schema setup completed successfully.")
        
    except Exception as e:
        print(f"Database error: {e}")
        sys.exit(1)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    migrate()
