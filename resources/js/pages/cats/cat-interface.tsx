export interface Cat {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'unknown';
  birth_date: string | null;        // ISO date string from API
  arrival_date: string | null;     // ISO date string
  neutered: 'yes' | 'no' | 'unknown';
  description: string | null;
  created_at: string;              // from $table->timestamps()
  updated_at: string;              // from $table->timestamps()
}
