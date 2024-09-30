# Custom Fields

## Table of Contents

1. [Introduction](#introduction)
2. [Demo](#demo)
3. [Video](#video)
4. [Features](#features)
5. [Installation](#installation)
6. [Setting up Custom Fields](#setting-up-custom-fields)
    - [Step 1: Publish and Run Migrations](#step-1-publish-and-run-migrations)
    - [Step 2: Publish the Configuration File (Optional)](#step-2-publish-the-configuration-file-optional)
    - [Step 3: Integrating Custom Fields Plugin](#step-3-integrating-custom-fields-plugin)
    - [Step 4: Adding Custom Fields to Forms](#step-4-adding-custom-fields-to-forms)
    - [Step 5: Displaying Custom Fields in Table Views](#step-5-displaying-custom-fields-in-table-views)
    - [Step 6: Setting Up the Model](#step-6-setting-up-the-model)
7. [Configuration](#configuration)
8. [Preset Custom Fields](#preset-custom-fields)
9. [Support](#support)
10. [Changelog](#changelog)
11. [Contributing](#contributing)
12. [Credits](#credits)
13. [License](#license)
14. [Code Distribution](#code-distribution)
15. [Thank You](#thank-you)

---

## Introduction

**Custom Fields** is a powerful and flexible plugin for [Filament](https://filamentphp.com/) that enables developers to
create dynamic, customizable form fields for their resources. This package allows you to effortlessly add user-defined
fields to your Filament resources, enhancing the adaptability and functionality of your admin panel.

With Custom Fields, you can define a wide variety of field types, including text inputs, textareas, select dropdowns,
radio buttons, and more. These custom fields can be assigned to any resource, providing a tailored data input experience
for your users. The plugin integrates smoothly with Filament's existing form builder, ensuring a consistent and familiar
experience throughout your admin panel.

---

## Demo

Experience the full functionality of Custom Fields in action.

[**Visit the Demo**](https://custom-fields.relaticle.com)

---

## Video

Watch a short demonstration showcasing some of the powerful features included in Custom Fields.

[**Watch the Video**](https://www.youtube.com/watch?v=QnZ9qXwGwR0)

---

## Features

- **Wide Variety of Field Types**:
    - Text, Number, Link, Textarea, Currency, Date, Date and Time, Toggle, Toggle Buttons, Select, Checkbox, Checkbox
      List, Radio, Rich Editor, Markdown Editor, Tags Input, Color Picker, Multi-select.
    - **Coming Soon**: Additional field types to be added.

- **Dynamic Field Management**:
    - Easily create, edit, and delete custom fields.
    - Assign custom fields to any Filament resource.
    - Organize custom fields using a drag-and-drop interface.

- **Validation and Data Integrity**:
    - Define validation rules for each custom field.
    - Ensure data integrity and prevent invalid data submissions.

- **Seamless Integration with Filament**:
    - Dynamically render custom fields in Filament forms.
    - Display custom fields in table views automatically.
    - Full support for dark mode and responsive design.

- **Advanced Features**:
    - Custom Field Builder interface for easy field creation and management.
    - Developers can create preset custom fields in code and deploy them for clients.
    - Compatible with Filament's form layouts and validation.
    - Support for multi-tenancy and tenant awareness.

---

## Installation

Thank you for purchasing **Custom Fields**! This guide provides step-by-step instructions on installing and configuring
the plugin.

### Requirements

- **PHP**: 8.1 or higher
- **Laravel**: 10.0 or higher
- **Filament**: 3.0 or higher

### Activating your license on Lemon Squeezy

Custom Fields uses [Lemon Squeezy](https://www.lemonsqueezy.com/) to handle payment and licensing.
For distribution we use [Satis Relaticle](https://satis.relaticle.com/), a private Composer repository.

During the purchasing process, Lemon Squeezy will provide you with a license key.

> Tip: You will need your `license key` to authenticate when you install the package with composer.

### Installing with Composer

To install Custom Fields you'll need to add the package to your `composer.json` file:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://satis.relaticle.com"
        }
    ]
}
```

Once the repository has been added to your composer.json file, you can install Custom Fields like any other composer
package using the composer require command:

```bash
composer require relaticle/custom-fields
```

Next, you will be prompted to provide your username and password.

```bash
Loading composer repositories with package information
Authentication required (satis.relaticle.com):
Username: [licensee-email]
Password: [license-key]
```

Your username will be your email address and the password will is your license key. 
For example, let's say we have the following email and license activation:

- Contact email: **myname@example.com**
- License key: **9f3a2e1d-5b7c-4f86-a9d0-3e1c2b4a5f8e**

You will need to enter the above information as follows when prompted for your credentials:

```bash
Loading composer repositories with package information
Authentication required (satis.relaticle.com):
Username: myname@example.com
Password: 9f3a2e1d-5b7c-4f86-a9d0-3e1c2b4a5f8e
```

---

## Setting up Custom Fields

This section will guide you through setting up and using the Custom Fields plugin in your Filament admin panel.

### Step 1: Publish and Run Migrations

Publish the migration files:

```bash
php artisan vendor:publish --tag="custom-fields-migrations"
```

Run the migrations:

```bash
php artisan migrate
```

### Step 2: Publish the Configuration File (Optional)

If you wish to customize the configuration, publish the config file:

```bash
php artisan vendor:publish --tag="custom-fields-config"
```

This will create a `custom-fields.php` file in your `config` directory.

### Step 3: Integrating Custom Fields Plugin

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

### Step 4: Adding Custom Fields to Forms

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

### Step 5: Displaying Custom Fields in Table Views

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

### Step 6: Setting Up the Model

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

## Configuration

The configuration file (`config/custom-fields.php`) allows you to customize various aspects of the plugin. Below is the
default configuration:

```php
return [
    /*
    |--------------------------------------------------------------------------
    | Custom Fields Resource Configuration
    |--------------------------------------------------------------------------
    |
    | This section controls the Custom Fields resource.
    | This allows you to customize the behavior of the resource.
    |
    */
    'custom_fields_resource' => [
        'should_register_navigation' => true,
        'slug' => 'custom-fields',
        'navigation_sort' => -1,
        'navigation_badge' => false,
        'navigation_group' => true,
        'is_globally_searchable' => false,
        'is_scoped_to_tenant' => true,
        'cluster' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Entity Resources Configuration
    |--------------------------------------------------------------------------
    |
    | This section controls which Filament resources are allowed or disallowed
    | to have custom fields. You can specify allowed resources, disallowed
    | resources, or leave them empty to use default behavior.
    |
    */
    'allowed_entity_resources' => [
        // App\Filament\Resources\UserResource::class,
    ],

    'disallowed_entity_resources' => [
        //
    ],

    /*
    |--------------------------------------------------------------------------
    | Entity Resources Customization
    |--------------------------------------------------------------------------
    |
    | This section allows you to customize the behavior of entity resources,
    | such as enabling table column toggling and setting default visibility.
    |
    */
    'resource' => [
        'table' => [
            'columns_toggleable' => [
                'enabled' => true,
                'hidden_by_default' => true,
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Lookup Resources Configuration
    |--------------------------------------------------------------------------
    |
    | Define which Filament resources can be used as lookups. You can specify
    | allowed resources, disallowed resources, or leave them empty to use
    | default behavior.
    |
    */
    'allowed_lookup_resources' => [
        //
    ],

    'disallowed_lookup_resources' => [
        //
    ],

    /*
    |--------------------------------------------------------------------------
    | Tenant Awareness Configuration
    |--------------------------------------------------------------------------
    |
    | When enabled, this feature implements multi-tenancy using the specified
    | tenant foreign key. Enable this before running migrations to automatically
    | register the tenant foreign key.
    |
    */
    'tenant_aware' => true,


    /*
    |--------------------------------------------------------------------------
    | Database Migrations Paths
    |--------------------------------------------------------------------------
    |
    | In these directories custom fields migrations will be stored and ran when migrating. A custom fields
    | migration created via the make:custom-fields-migration command will be stored in the first path or
    | a custom defined path when running the command.
    |
    */
    'migrations_paths' => [
        database_path('custom-fields'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Database Table Names
    |--------------------------------------------------------------------------
    |
    | You can specify custom table names for the package's database tables here.
    | These tables will be used to store custom fields, their values, and options.
    |
    */
    'table_names' => [
        'custom_fields' => 'custom_fields',
        'custom_field_values' => 'custom_field_values',
        'custom_field_options' => 'custom_field_options',
    ],

    /*
    |--------------------------------------------------------------------------
    | Column Names
    |--------------------------------------------------------------------------
    |
    | Here you can customize the names of specific columns used by the package.
    | For example, you can change the name of the tenant foreign key if needed.
    |
    */
    'column_names' => [
        'tenant_foreign_key' => 'tenant_id',
    ],
];
```


## Preset Custom Fields

Preset Custom Fields allow developers to programmatically define, deploy, and manage custom fields for Filament
resources using migrations.
This approach ensures consistency, version control, and easy deployment across different
environments.

### Creating Custom Fields Migrations

To create a new custom fields migration, use the dedicated Artisan command:

```bash
php artisan make:custom-fields-migration CreateGeneralCustomFieldsForOpportunity
```

This command generates a new migration file in your `database/migrations/custom-fields` directory with a timestamp prefix and the name you specified.

### Field Types and Properties

The `CustomFieldType` enum provides various field types you can use. Here are some common types and their associated properties:

- `TEXT`: Basic text input
- `NUMBER`: Numeric input
- `SELECT`: Dropdown selection
- `MULTI_SELECT`: Multiple selection
- `DATE`: Date picker
- `TOGGLE`: Boolean toggle switch
- `TEXTAREA`: Multi-line text input

Refer to the `CustomFieldType` enum for a complete list of available field types.

### Creating Fields

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

### Updating Fields

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

### Deleting Fields

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

### Restoring Fields

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

### Deploying Preset Fields

To deploy your preset custom fields, run the standard Laravel migration command:

```bash
php artisan migrate --path=database/custom-fields
```


### Best Practices

1. **Naming Conventions**: Use clear, descriptive names for your migration files.
2. **Versioning**: Create separate migrations for creating, updating, and deleting fields to maintain a clear history.
3. **Idempotency**: Ensure your migrations are idempotent (can be run multiple times without side effects).
4. **Documentation**: Comment your migrations to explain the purpose of each change.
5. **Data Integrity**: When updating or deleting fields, consider the impact on existing data.

---

## Support

Need assistance? Encountered a bug? Have a feature request? We’re here to help!

- **Email**: [`customfieldsnext@gmail.com`](mailto:customfieldsnext@gmail.com)
- **Bug Reports & Feature Requests**: [GitHub Issues](https://github.com/your-repo/issues) *(Replace with your actual
  repository link)*

Feel free to reach out with your queries, and we'll get back to you promptly.

---

## Changelog

Stay updated with the latest changes, improvements, and bug fixes.

[**View Changelog**](CHANGELOG.md)

---

## Contributing

We welcome contributions from the community! If you hold an active license, you can access the private repository to
contribute.

---

## Credits

- **[ManukMinasyan](https://github.com/ManukMinasyan)**

---

## License

### Single License

The **Single License** grants permission to use Custom Fields in a single project hosted on one domain or subdomain.
Suitable for personal websites or projects for a single client.

- **Usage**: Single project on one domain/subdomain
- **Users**: Up to 5 Employees and Contractors
- **Support & Updates**: Included for one year from the date of purchase
- **Renewal**: Discounted renewal available after expiration to continue receiving updates and new features

*Note*: For SaaS applications or multiple projects, please refer to our other licensing options.

### Unlimited License

The **Unlimited License** allows the use of Custom Fields on unlimited domains and subdomains, including SaaS
applications.

- **Usage**: Unlimited projects on multiple domains/subdomains
- **Users**: Up to 25 Employees and Contractors
- **Support & Updates**: Included for one year from the date of purchase
- **Renewal**: Discounted renewal available after expiration to continue receiving updates and new features

### Lifetime License

The **Lifetime License** offers the same benefits as the Unlimited License with lifetime updates.

- **Usage**: Unlimited projects on multiple domains/subdomains
- **Users**: Up to 25 Employees and Contractors
- **Support & Updates**: Lifetime updates and bug fixes
- **Renewal**: No renewal needed

---

## Code Distribution

**Custom Fields** licenses strictly prohibit the public distribution of its source code. You may not:

- Build applications using Custom Fields and distribute them publicly via open-source repositories, hosting platforms,
  or any other code distribution platforms.

Violating this policy may result in license termination and potential legal action.

---

## Thank You

Thank you for choosing **Custom Fields**! We are committed to providing you with the tools and support needed to create
dynamic and customizable applications.
