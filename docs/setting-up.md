# Setting up Custom Fields

This section will guide you through setting up and using the Custom Fields plugin in your Filament admin panel.

## Step 1: Publish and Run Migrations

Publish the migration files:

```bash
php artisan vendor:publish --tag="custom-fields-migrations"
```

Run the migrations:

```bash
php artisan migrate
```

## Step 2: Publish the Configuration File (Optional)

If you wish to customize the configuration, publish the config file:

```bash
php artisan vendor:publish --tag="custom-fields-config"
```

This will create a `custom-fields.php` file in your `config` directory.

## Step 3: Integrating Custom Fields Plugin

To use Custom Fields, you need to register the plugin with your Filament panel.

```php
use Relaticle\CustomFields\CustomFieldsPlugin;
use Filament\Panel;

public function panel(Panel $panel): Panel
{
    return $panel
        // ... other panel configurations
        ->plugins([
            CustomFieldsPlugin::make(),
        ]);
}
```

## Step 4: Adding Custom Fields to Forms

To include custom fields in your resource forms, you'll use the `CustomFieldsComponent`. This component dynamically adds
all the custom fields associated with the resource.

In your resource class (e.g., `CompanyResource`), modify the `form()` method:

```php
use Relaticle\CustomFields\Filament\Forms\Components\CustomFieldsComponent;
use Filament\Forms;
use Filament\Resources\Form;

class CompanyResource extends Resource
{
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Your existing form fields
                Forms\Components\TextInput::make('name')
                    ->required(),
                Forms\Components\TextInput::make('email')
                    ->email(),

                // Add the CustomFieldsComponent
                CustomFieldsComponent::make()
                    ->columns(1),
            ]);
    }

    // ...
}
```

## Step 5: Displaying Custom Fields in Table Views

To display custom fields in your table views, you need to use the `InteractsWithCustomFields` trait in your
resource's `ListRecords` page.

In your list records class (e.g., `ListCompanies`), add the trait:

```php
use Relaticle\CustomFields\Filament\Tables\Concerns\InteractsWithCustomFields;
use Filament\Resources\Pages\ListRecords;

class ListCompanies extends ListRecords
{
    use InteractsWithCustomFields;

    // ...
}
```

This trait automatically includes all custom fields in the table view for the resource.

## Step 6: Setting Up the Model

Your model needs to implement the `HasCustomFields` interface and use the `UsesCustomFields` trait to work with custom
fields.

In your model (e.g., `Company`), add the following:

```php
use Relaticle\CustomFields\Models\Contracts\HasCustomFields;
use Relaticle\CustomFields\Models\Concerns\UsesCustomFields;
use Illuminate\Database\Eloquent\Model;

class Company extends Model implements HasCustomFields
{
    use UsesCustomFields;

    // ... your existing model code
}
```

By following these steps, your model will be fully equipped to handle custom fields, and you will have successfully set
up Custom Fields in your Filament application, enabling dynamic and flexible data management.

---