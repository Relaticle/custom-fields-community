# Preset Custom Fields

Preset Custom Fields allow developers to programmatically define, deploy, and manage custom fields for Filament
resources using migrations.
This approach ensures consistency, version control, and easy deployment across different
environments.

## Creating Custom Fields Migrations

To create a new custom fields migration, use the dedicated Artisan command:

```bash
php artisan make:custom-fields-migration CreateGeneralCustomFieldsForOpportunity
```

This command generates a new migration file in your `database/migrations/custom-fields` directory with a timestamp prefix and the name you specified.

## Field Types and Properties

The `CustomFieldType` enum provides various field types you can use. Here are some common types and their associated properties:

- `TEXT`: Basic text input
- `NUMBER`: Numeric input
- `SELECT`: Dropdown selection
- `MULTI_SELECT`: Multiple selection
- `DATE`: Date picker
- `TOGGLE`: Boolean toggle switch
- `TEXTAREA`: Multi-line text input

Refer to the `CustomFieldType` enum for a complete list of available field types.

## Creating Fields

In your migration file, use the `new()` method to create new custom fields:

```php
use App\Models\Opportunity;
use App\Models\User;
use Relaticle\CustomFields\Enums\CustomFieldType;
use Relaticle\CustomFields\Migrations\CustomFieldsMigration;

return new class extends CustomFieldsMigration
{
    public function up(): void
    {
        $this->migrator->new(
            model: Opportunity::class,
            type: CustomFieldType::TEXT,
            name: 'Name',
            code: 'name'
        )->create();

        $this->migrator
            ->new(
                model: Opportunity::class,
                type: CustomFieldType::SELECT,
                name: 'Stage',
                code: 'stage'
            )
            ->options([
                'New',
                'Screening',
                'Meeting',
                'Proposal',
                'Customer',
            ])
            ->create();
            
        $this->migrator
            ->new(
                model: Opportunity::class,
                type: CustomFieldType::SELECT,
                name: 'Author',
                code: 'author'
            )
            ->lookupType(User::class)
            ->create();
    }
};
```

## Updating Fields

To update existing fields, create a new migration and use the `update()` method:

```php
use App\Models\Opportunity;
use Relaticle\CustomFields\Migrations\CustomFieldsMigration;

return new class extends CustomFieldsMigration
{
    public function up(): void
    {
        $this->migrator
        ->find(Opportunity::class, 'stage')
        ->options([
                'New',
                'Qualified',
                'Proposal',
                'Negotiation',
                'Closed Won',
                'Closed Lost',
            ])
        ->update();
    }
};
```

## Deleting Fields

To remove preset fields, create a migration that uses the `delete()` method:

```php
<?php

use App\Models\Opportunity;
use Relaticle\CustomFields\Migrations\CustomFieldsMigration;

return new class extends CustomFieldsMigration
{
    public function up(): void
    {
        $this->migrator->find(Opportunity::class, 'stage')->delete();
        // $this->migrator->find(Opportunity::class, 'stage')->forceDelete();
    }
};
```

**Note**: Deleting a field with function forceDelete is permanent and will result in data loss. Ensure you have backups and that no part of your application depends on the field being deleted.

## Restoring Fields

To restore preset fields, create a migration that uses the `restore()` method:

```php
<?php

use App\Models\Opportunity;
use Relaticle\CustomFields\Migrations\CustomFieldsMigration;

return new class extends CustomFieldsMigration
{
    public function up(): void
    {
        $this->migrator->find(Opportunity::class, 'stage')->restore();
    }
};
```

## Deploying Preset Fields

To deploy your preset custom fields, run the standard Laravel migration command:

```bash
php artisan migrate --path=database/custom-fields
```


## Best Practices

1. **Naming Conventions**: Use clear, descriptive names for your migration files.
2. **Versioning**: Create separate migrations for creating, updating, and deleting fields to maintain a clear history.
3. **Idempotency**: Ensure your migrations are idempotent (can be run multiple times without side effects).
4. **Documentation**: Comment your migrations to explain the purpose of each change.
5. **Data Integrity**: When updating or deleting fields, consider the impact on existing data.

---