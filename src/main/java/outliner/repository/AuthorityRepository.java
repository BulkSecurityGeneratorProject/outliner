package outliner.repository;

import outliner.domain.Authority;
import outliner.persistence.CustomRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends CustomRepository<Authority, String> {
}
